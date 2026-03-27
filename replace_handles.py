import glob
import re

for filename in glob.glob('./src/components/workflow/nodes/*.tsx'):
    with open(filename, 'r') as f:
        code = f.read()

    # Revert previously added !-left-x classes
    code = re.sub(r'!-left-\d+ ', '', code)
    code = re.sub(r'!-right-\d+ ', '', code)
    
    # We will simply find all Handles and ensure they have the proper inline style if that position is found.
    # Because there might be `style={{ ... }}` already, let's just do a simple replacement for the Position props.
    # By default React Flow handles left/right if you simply reset their classes.
    # The actual issue is the nodes might have `relative overflow-hidden` or the handles are inside a padded container!
    # Let's check CropNode. The Handles are inside `<div className="relative flex items-center h-4">` which is inside `<div className="p-3">`.
    # This means `left: 0` will put the handle at the left edge of the INNER div, not the outer Node!
    # Ah! That's why it's irregular.

    # To fix this, we should apply absolute positioning to pull them out of the padding.
    # left side handles are in a padding of 12px (p-3), so they should be left: -16px.

    pass