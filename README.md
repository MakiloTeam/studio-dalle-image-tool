# Makilo Studio - DALL·E 2 Image Tool

Fun with OpenAI's DALL·E APIs for generating and editing images.

- [Makilo Studio - DALL·E 2 Image Tool](#makilo-studio---dalle-2-image-tool)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Create](#create)
    - [Variation](#variation)
    - [Edit](#edit)


## Requirements

Node.js v14 or higher
An OpenAI API key https://platform.openai.com/account/api-keys

## Installation

Clone this repository.

Run `npm install` in the project directory to install the required dependencies.

Copy `.env.example` to `.env` and set your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

## Usage

### Create

Creating images from scratch based on a text prompt.

```
npm run create
```

1. Enter description of the image you want (max 1000 chars). The more detailed the description, the more likely you are to get the result that you want.
2. Enter number of images to generate (between 1 and 10)
3. Click on the returned urls to view them in the browser. Remember they only last 1 hr so if you want to keep them download them quick.

### Variation

Creating variations of an existing image.

Set your image in `./images/`

```
npm run variation
```

1. Enter description of the image you want (max 1000 chars). The more detailed the description, the more likely you are to get the result that you want.
2. Enter number of images to generate (between 1 and 10)
3. Click on the returned urls to view them in the browser. Remember they only last 1 hr so if you want to keep them download them quick.

### Edit

Creating edits of an existing image based on a new text prompt

Set your image and mask in `./images/`

```
npm run edit
```

1. Enter description of the image you want (max 1000 chars). The more detailed the description, the more likely you are to get the result that you want. The transparent areas of the mask indicate where the image should be edited, and the prompt should describe the full new image, not just the erased area.
2. Enter number of images to generate (between 1 and 10)
3. Click on the returned urls to view them in the browser. Remember they only last 1 hr so if you want to keep them download them quick.


