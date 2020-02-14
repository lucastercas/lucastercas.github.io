---
path: "/ssh-cicd-server"
date: "2020-02-14"
title: "Deploying code by SSHing into a machine"
description: "SSH into server on CI/CD machine"
---

One strategy I usually use on a CI/CD pipeline when I am too lazy to do
something more complicated, is to SSH into the server and there execute
a script, or git pull, to update the source code.

However, I don't do this often enough, and sometimes I forget how to do it, this post
documents how I usually do it, so I can come back to it to remember it or to 
update the proccess as I learn new things.

Also, I hope it helps you if you are looking for something like this
and having trouble implementing it.

#### Generating SSH key-pair
First, the server you are trying to SSH into need to have a SSH key-pair,
namely, a private key and a public key. The following command creates
a simple rsa key-par for you:
```bash
ssh-keygen
```
It creates two files, the private key and the public key, in the following
locations of your filesystem if you didn't change anything on the command:
1. ~/.ssh/id_rsa which is the private key
2. ~/.ssh/id_rsa.pub which is the public key

#### Creating environment variable

The container needs the private key so it can have authorization to SSH into
the machine, this can be done by setting a enviroment variable on your version
control platform, be it GitHub or GitLab. I like to name the variable __$SSH\_PRIVATE\_KEY__.

```bash
cat ~/.ssh/id_rsa # Print the contents to the console
```
After printing it to the console, copy it and paste it into the environment variable:
![GitLab CI/CD Variables Interface](./gitlab-variables.png)

#### Getting the variables into the container

```yml
script:
  - eval $(ssh-agent -s)                           # Start SSH Agent
  - mkdir -p ~/.ssh                                # Create SSH directory, if the container didn't have one
  - ssh-keycan -t $SERVER_URL > ~/.ssh/known_hosts # Get the public key of the server and add it to known_hosts
  - bash -c 'ssh-add <(echo $SSH_PRIVATE_KEY)'     # Add the private key of the server 
  - ssh $SERVER_URL 'echo hello world'             # SSH into the server
```