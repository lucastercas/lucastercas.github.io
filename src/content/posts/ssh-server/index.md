---
path: "/ssh-cicd-server"
date: "2020-02-14"
title: "Deploying code by SSHing into a machine"
description: "SSH into server on CI/CD machine"
---

De vez em quando, quando tenho que fazer o deploy de alguma aplicação, tenho
que fazer SSH em alguma máquina, seja por que ela ta hospedando a aplicação,
ou por que ela é o master node de algo que comanda outras máquinas.

Mas como eu não faço isso frequentemente, as vezes esqueço uns passos,
e as vezes vem gente perguntando pra mim como fazer, então resolvi
escrever aqui, pra facilitar o trabalho. :)

#### Gerar o par de chaves SSH
Primeiro, a máquina em que você tá tentando entrar tem que ser um cliente
SSH, geralmente é o `openssh`, com a porta aberta (22), e um par de chaves.
O `ssh-keygen` pode ser usado pra gerar esse par de chaves, que por padrão
cria duas elas nesse local:
1. ~/.ssh/id_rsa => a chave privada
2. ~/.ssh/id_rsa.pub => a chave pública

#### Variáveis de ambiente no cliente Git
Eu na maioria das vezes uso o GitLab ou o GitHub pra fazer o deploy, então
vou usar eles como referência, em ambos é criado um container para
fazer SSH na máquina desejada, e pra isso é mais seguro botar
as chaves em uma variável de ambiente do que no próprio código

Para isso, o container precisa de informações, o host em que irá
fazer SSH, o usuário e a chave privada do usuário, por padrão, eu gosto
de nomear elas __$HOST__, __$USER__ e __$SSH\_PRIVATE\_KEY__, respectivamente.

Para pegar a chave privada: `cat .ssh/id_rsa` e copie o que aparece

Por exemplo, no GitLab, essa é a interface pra salvar as variaveis
![GitLab CI/CD Variables Interface](./gitlab-variables.png)

#### Examplo do script para o CI/CD do GitLab (.gitlab.yml)

```yml
script:
  - eval $(ssh-agent -s)                           # Começar o agente SSH
  - mkdir -p ~/.ssh                                # Criar o diretório do SSH, caso o container não tenha um
  - ssh-keyscan $HOST > ~/.ssh/known_hosts         # Pegar a chave pública do host
  - bash -c 'ssh-add <(echo $SSH_PRIVATE_KEY)'     # Adicionar a chave privada do host
  - ssh $USER@$HOST 'echo hello world'             # SSH no servidor
```
