#!/usr/bin/env sh
set -e

git config user.email "1322457349@qq.com"
git config user.name "wengzhisong"

git add .
git commit -m 'deploy'

npm run build
cd docs/.vuepress/dist
git init
git add -A
time=$(date "+%Y%m%d-%H%M%S")
git commit -m "deploy ${time}"
git push -f git@github.com:wengzhisong-hz/wengzhisong-hz.github.io.git master

cd ../../
git config user.email "1322457349@qq.com"
git config user.name "wengzhisong"
git add .
git commit -m 'deploy'
git checkout dev || git checkout -b dev
git merge master
git push origin dev
git checkout master
cd -
