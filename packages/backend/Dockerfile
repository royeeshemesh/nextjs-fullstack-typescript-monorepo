FROM node:10

# Environment

WORKDIR /home/nextjs-fullstack
ENV NODE_ENV=production
ENV NODE_PATH=./dist

# Dependencies

COPY tsconfig.base.json /home/nextjs-fullstack/
COPY package.json /home/nextjs-fullstack/
COPY yarn.lock /home/nextjs-fullstack/
COPY lerna.json /home/nextjs-fullstack/

COPY packages/backend/ /home/nextjs-fullstack/packages/backend/
COPY packages/common/ /home/nextjs-fullstack/packages/common/

RUN echo $(ls -1 /home/nextjs-fullstack/packages/backend/)

RUN yarn install --frozen-lockfile

# Build
RUN cd packages/backend && npm run build

# Serve
WORKDIR /home/nextjs-fullstack/packages/backend/

EXPOSE 8081
# Running the app
CMD [ "npm", "start" ]
