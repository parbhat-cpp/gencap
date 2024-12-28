# GenCap

GenCap is a web app which generates social media captions by using Llama vision AI. 

Follow the simple steps to generate captions:-

- Click on upload an image to select image from local storage.
- You can also select the length of the captions (optional).
- If you want to provide some additional information with the image you may provide it here (optional).
- There are three buttons Upload image, Generate captions and remove image. To generate captions first you have to upload image and then click on generate captions.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_BASE_URL` = CLIENT URL

`VITE_BACKEND_URL` = SERVER URL


## Installation

Create a fork and clone repository. After that install dependencies

```bash
npm install
```

To run on dev environment
```bash
npm run dev
```

To create a build
```bash
npm run build
```
    
## Tech Stack

**Client:** React, TailwindCSS, Shadcn

**Server:** Node, Express, Cloudflare R2, Llama vision AI API


## Authors

- [@parbhat-cpp](https://www.github.com/parbhat-cpp)

