# Git commands

git init - create a new git repo
git status - View the changes to your project code
git add - Add files to staging area
# Use the -am flag to commit all changed files
git commit - Creates a new commit with files from staging area
git log - View recent commits
git push - Push changes to GitHub

# Setting up which ssh security to use when connecting to things like Github 
ssh-keygen -t rsa -b  4096 -C "lmarvelly@hotmail.com"
# Check if it was setup correctly (you should see a id_rsa and id_rsa.pub file) 
ls -a ~/.ssh
# Checks to make sure ssh is used when connecting to Github if it's not then its set up to do so
eval "$(ssh-agent -s)"
# Now add the new key
ssh-add ~/.ssh/id_rsa

# Install xclip on Fedora
sudo apt-get install xclip
# Copy SSH public key to keyboard (Add this to the SSH settings in Github account)
xclip -selection clipboard < ~/.ssh/id_rsa.pub 

# Test if everything is setup correctly
ssh -T git@github.com
# Let git know what this is where the remote code should live. Default name should be 'origin'
git remote add origin https://github.com/lmarvelly/react-course-expensify-app.git
# should return 'origin'
git remote
# should return: 
# 		origin	https://github.com/lmarvelly/react-course-expensify-app.git (fetch)
# 		origin	https://github.com/lmarvelly/react-course-expensify-app.git (push)
git remote -v
# Push the code to create the accociation between local code and the upstream github repositiory. (Only need to use -u flag once)
git push


<!-- YARN COMMANDS -->
# Start Developer Server
yarn dev-server 

# Install modules
yarn install
# Only install Production Dependancies
yarn install --production

# Add modules for development (and not for production). Use --dev
yarn add chalk --dev

<!-- Heroku Commands -->
# Login
heroku login

# Push changes up to Heroku (Use git push first)
git push heroku master

# View Logs. This is helpful if you're getting errors
heroku logs