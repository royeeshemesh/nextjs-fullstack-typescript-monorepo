FROM node:10

# Environment

WORKDIR /home/nextjs-fullstack
ENV NODE_ENV=production

# Dependencies

COPY tsconfig.base.json /home/nextjs-fullstack/
COPY package.json /home/nextjs-fullstack/
COPY yarn.lock /home/nextjs-fullstack/
COPY lerna.json /home/nextjs-fullstack/

COPY packages/app/ /home/nextjs-fullstack/packages/app/
COPY packages/common/ /home/nextjs-fullstack/packages/common/

RUN echo $(ls -1 /home/nextjs-fullstack/packages/app/)

RUN yarn install --frozen-lockfile
# RUN npm ci --ignore-scripts --production --no-optional
# RUN npx lerna bootstrap --ignore-scripts -- --production --no-optional

# Build
RUN cd packages/app && npm run build

# Serve
WORKDIR /home/nextjs-fullstack/packages/app/

EXPOSE 8081
# Running the app
CMD [ "npm", "start" ]
