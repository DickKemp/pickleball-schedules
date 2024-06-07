import random
import json
import datetime
from collections import defaultdict

class Seed:
    seed = 0

    @classmethod
    def set_seed(cls, seed):
        cls.seed = seed

    @classmethod
    def get_seed(cls):
        seed = cls.seed
        cls.seed = cls.seed + 1
        return seed
    
def generate_initial_pairings(players):
    random.seed(Seed.get_seed())
    random.shuffle(players)
    return [players[i:i + 4] for i in range(0, len(players), 4)]

def count_interactions(pairings, teammates, opponents):
    for group in pairings:
        team1, team2 = group[:2], group[2:]
        for player in team1:
            for teammate in team1:
                if player != teammate:
                    teammates[player].add(teammate)
            for opponent in team2:
                opponents[player][opponent] += 1
        for player in team2:
            for teammate in team2:
                if player != teammate:
                    teammates[player].add(teammate)
            for opponent in team1:
                opponents[player][opponent] += 1

def is_valid_group(group, teammates, opponents, strict=True):
    team1, team2 = group[:2], group[2:]
    for player in team1:
        if any(teammate in teammates[player] for teammate in team1 if player != teammate):
            return False
        if strict and any(opponent in opponents[player] for opponent in team2):
            return False
    for player in team2:
        if any(teammate in teammates[player] for teammate in team2 if player != teammate):
            return False
        if strict and any(opponent in opponents[player] for opponent in team1):
            return False
    return True

def find_sitouts(players, num_sitouts, sitouts):
    available_players = [player for player in players if player not in sitouts]
    random.seed(Seed.get_seed())
    return random.sample(available_players, num_sitouts)

def generate_pairings(players, rounds, max_attempts=1000):
    teammates = defaultdict(set)
    opponents = defaultdict(lambda: defaultdict(int))
    all_pairings = []
    all_sitouts = set()
    
    for _ in range(rounds):
        valid_pairings = False
        attempts = 0
        num_players = len(players)
        num_sitouts = num_players % 4
        sitouts = set()

        # Find sitouts ensuring no one sits out more than once
        while not valid_pairings and attempts < max_attempts:
            if num_sitouts > 0:
                sitouts = find_sitouts(players, num_sitouts, all_sitouts)
            playing_players = [player for player in players if player not in sitouts]

            pairings = generate_initial_pairings(playing_players)
            if all(is_valid_group(group, teammates, opponents, strict=True) for group in pairings):
                valid_pairings = True
            attempts += 1

        # If strict constraints fail, relax them
        if not valid_pairings:
            attempts = 0
            while not valid_pairings and attempts < max_attempts:
                if num_sitouts > 0:
                    sitouts = find_sitouts(players, num_sitouts, all_sitouts)
                playing_players = [player for player in players if player not in sitouts]

                pairings = generate_initial_pairings(playing_players)
                if all(is_valid_group(group, teammates, opponents, strict=False) for group in pairings):
                    valid_pairings = True
                attempts += 1

        if not valid_pairings:
            raise ValueError("Could not generate valid pairings even with relaxed constraints")
        
        count_interactions(pairings, teammates, opponents)
        # all_pairings.append((pairings, list(sitouts)))
        all_pairings.append({ "playing": pairings, "sitting" : list(sitouts)})
        all_sitouts.update(sitouts)
    
    return all_pairings, opponents

def print_pairings(tournament_pairings):
    for round_num, (round_pairings, sitouts) in enumerate(tournament_pairings, 1):
        print(f"Round {round_num}: {round_pairings}, Sitouts: {sitouts}")

def print_opponents_summary(opponents, players):
    print("\nPlayer Opponent Summary:")
    sum = 0
    for player in players:
        first = True
        for opponent in sorted(opponents[player]):
            count = opponents[player][opponent]
            if count > 1:
                sum += count                
                if first:
                    print(f"Player {player}:")
                    first = False
                print(f"  Against Player {opponent}: {count} times")
    if sum == 0:
        print(f"Nobody played any opponent more than once")
    return sum

def calc_opponents_summary(opponents, players):
    sum = 0
    for player in players:
        first = True
        for opponent in sorted(opponents[player]):
            count = opponents[player][opponent]
            if count > 1:
                sum += count                
    return sum

def calc_pairings(num_players, rounds, seed, num_attempts):
    # return { "num_players" : num_players,
    #          "score" : 10,
    #          "rounds" : rounds,
    #          "seed": seed,
    #          "num_attempts" : num_attempts,
    #          "pairings" : [1,2,3,4,5,6]
    # }
    players = list(range(1, num_players + 1))
    Seed.set_seed(seed)
    pairings, opponents = generate_pairings(players, rounds, num_attempts)
    score = calc_opponents_summary(opponents, players)
    return { "num_players" : num_players,
             "score" : score,
             "rounds" : rounds,
             "seed": seed,
             "num_attempts" : num_attempts,
             "pairings" : pairings
    }
