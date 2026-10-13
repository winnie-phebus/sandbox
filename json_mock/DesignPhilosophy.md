# Design Philosophy

- Ok so the idea right now for these little guys is that I want some Big Things from them, and I want to represent so much using lines & relationships between two points, but I'm definitely going to have to make a custom deserializer so that I can store, import, and export my pointData relatively easily.

- Concerns:
  - I want to allow for asymmetry but also not have complicated objects T-T
  - I don't want objects to be too complicated / have too many subitems
  - I need to remember that there's a lot of existing math that can make my life much easier (transformations, saving paths directly, etc)
  - I still want to be able to develop presets for certain items and have them be "hot-swappable"
  - I'm going to use  a layer-system to handle depth.
  - To save in rendering cost, I can calculate the overlap + layer of points to determine whether the object needs rendering.
    - item with -1 that is the figure's direct center back would be hidden until figure is shifted and then would be rendered as long as there are no overlapping point values that are higher in layer and opacity.
    - this will be deprioritized until after base work is completed.

## Layer Logic

Items will have a field of type double that is a number between -3 and 3, with 0 being the most neutral position, and -1 - 1 relating to further dimensionality of the figure.

Ex: layer = 0 is on the "body" of the figure, layer = .1 is still body, just above the skin tone. Nose tip would be 1, but nose body would be .5 to 1.

What to do when layer is the same?
I don't know yet. Might have to consider opacity and overlap.

## Pseudocode

Key:

- (l: n <-> -n): Layer values should stay restricted within n and -n
Head:

Items:

- Hair (l: -1 - 1)
  - Bangs:
    - Front (l: 1 <-> .5)
    - Side
- HeadBase:
  - SkinTone
  - JawShape
  - SkullShape
  - Face (l: .5 <-> 0)
    - Brows
    - Eyes
      - Lash
      - Eyeball
        - Pupil
        - Sclera
    - Nose (l: 1 <-> .2)
    - Mouth
      - Lips:
        - UpperLip
        - BottomLip
      - Teeth
      - Tongue
- Accessories