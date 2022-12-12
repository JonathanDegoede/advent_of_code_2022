with open('day_1/input.txt', 'r') as file:
    input = file.read()
    elves_calories_lists = [pack.split('\n') for pack in input.split('\n\n')]
    elves_calories_total_lists = [sum([int(calorie) for calorie in calories_list])
                                  for calories_list in elves_calories_lists]
    elves_calories_total_lists.sort(reverse=True)

    print(elves_calories_total_lists[0])
    print(elves_calories_total_lists[0] +
          elves_calories_total_lists[1] + elves_calories_total_lists[2])
