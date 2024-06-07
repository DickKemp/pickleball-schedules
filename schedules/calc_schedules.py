from doubles_games import calc_pairings
from collections import defaultdict
import datetime
import json

def calc_schedules(min_players, max_players, num_rounds):

    seeds = range(1,100,10)
    results = defaultdict(list)

    print('start at: ', datetime.datetime.now(), flush=True)
    for num_players in range(min_players, max_players + 1):
        for seed in seeds:
            print('.', end='', flush=True)
            res = calc_pairings(num_players, num_rounds, seed, 1000000)
            results[num_players].append(res)
            if res["score"] == 0:
                break

    print('.', flush=True)
    print('done at: ', datetime.datetime.now(), flush=True)
    return results

if __name__ == '__main__':
    min_players = 12
    max_players = 24
    num_rounds = 5

    draft_results = calc_schedules(min_players, max_players, num_rounds)
    min_score_results = [min(draft_results[i], key=lambda x: x['score']) for i in draft_results.keys()]
    with open(f"tmp_results_{num_rounds}.json", "w") as f:
        json.dump(min_score_results, f, indent=4)    

    with open(f"tmp_results_{num_rounds}.json", "r") as fp:
        min_score_results = json.load(fp)

        final_results = [{ "num_players" : result['num_players'], "schedule" : result['pairings'] } for result in min_score_results]
        with open(f"schedule_{num_rounds}.json", "w") as f:
            json.dump(final_results, f, indent=4)



