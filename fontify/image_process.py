""" Image processing module of fontify
"""

import cv2
import os

import fontforge as ff


def split(image, save_dir):
    """This function expects a numpy array of the image an splits the image according to the chargrids.
    """
    
    ROWS        = 12          # number of rows in array
    COLS        = 8           # number of columns
    STARTCHAR   = ' '         # UL character in array
    BORDERWIDTH = 5.0 / 483     # border of cell is so many pix
    HEADER      = 80.0 / 483    # proportion of cell taken up by header
    BORDERCLIP  = 4           # number of multiples of border to clip
    
    width = image.shape[1]
    height = image.shape[0]
    
    cellwidth    = int(width/COLS)
    cellheight   = int(height/ROWS)
    headerheight = int(cellheight*HEADER)
    borderpx     = int(cellheight*BORDERWIDTH)
    
    count = 32
    for rows in range(ROWS):
        for cols in range(COLS):
            
            left = (cols)*cellwidth + BORDERCLIP*borderpx
            top = (rows)*cellheight + headerheight + BORDERCLIP*borderpx

            xwidth  = cellwidth - 2*BORDERCLIP*borderpx
            xheight = cellheight - headerheight - 2*BORDERCLIP*borderpx
            
            roi = image[top: top + xheight, left: left + xwidth,:]
            
            name = str(count) + '.png'
            
            count += 1

            filepath = os.path.join(save_dir, name)
            cv2.imwrite(filepath, roi)

def font_generate(username, dirpath):
    font = ff.font()
    font.fontname = "{0}Fontify".format(username)
    font.familyname = "{0}".format(username)

    for i in xrange(96):
        image_name = str(i + 32) + '.png'

        image_path = os.path.join(dirpath, image_name)

        glyph = font.createMappedChar(chr(i + 32))
        glyph.importOutlines(image_path)
        font.selection.select(chr(i + 32))
        font.autoTrace()
        if i != 0:
            font.autoWidth(10)
        # font.autoKern()

    filename = '{0}.ttf'.format(username)

    filepath = os.path.join(dirpath, filename)
    font.generate(filepath)


if __name__ == '__main__':
    img = cv2.imread('app/users/CrapHand2.pbm')

    split(img)
