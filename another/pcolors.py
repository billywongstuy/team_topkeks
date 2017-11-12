import cv2
import numpy as np

img = cv2.imread('thingy.png')
img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
img_data = np.asarray(img)


colors = {}

for i in range(len(img_data)):
    for j in range(len(img_data[0])):
        if tuple(img_data[i][j]) not in colors:
            colors[tuple(img_data[i][j])] = 1
        else:
            colors[tuple(img_data[i][j])] += 1


colors = [(key,colors[key]) for key in colors]
colors.sort(key=lambda x:x[1])

for c in colors:
    print c

'''
((204, 57, 91), 26)
((137, 23, 51), 26)
((204, 62, 94), 26)
((137, 23, 55), 30)
((137, 24, 47), 31)
((206, 57, 94), 32)
((137, 23, 53), 32)

((185, 145, 138), 21)
((222, 184, 167), 21)
((221, 183, 164), 22)
((222, 183, 169), 22)
((189, 145, 148), 23)
((148, 36, 69), 27)
((220, 182, 163), 29)


((150, 29, 61), 24)
((149, 28, 58), 34)

'''
