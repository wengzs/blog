#!/usr/bin/env sh
set -e

git config --global user.email "1322457349@qq.com"
git config --global user.name "wengzhisong"

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

git add .
git commit -m 'deploy'
git checkout dev || git checkout -b dev
git merge master
git push origin dev
git checkout master

git config --global user.name "sp0140(陆抗)"
git config --global user.email "wengzs@supaur.com"

cd -
