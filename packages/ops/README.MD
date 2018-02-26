# Ops Setup

This is a containerized dev-ops build configured through docker-compose.

## Install
Make sure you have a Kubernetes cluster running.
1. Install helm.

        $ brew install kubernetes-helm
2. Add Incubator Repo.
        
        $ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
3. install etcd

        $ helm install --name etcd incubator/etcd
4. install vault
        $ helm 

## Run
    $ docker-compose up
## Vault
1. Install vault locally.
    * OSX
    
          $ brew install vault
2. Set the vault_addr.
    __NOTE:__ Example is for locally hosted instance.

        $ export VAULT_ADDR=http://127.0.0.1:8200
3. Initialize the vault server keep track of the generated unseal keys and root token.

        $ vault init
4. Unseal your vault using the generated keys.

        $ vault unseal
5. Set vault token to the root token.

        $ export VAULT_TOKEN=2ca82ba1-840d-908f-e089-1cd539cb9ace
6. Enable authorization via github.

        $ vault auth enable github
7. Configure organization authorization.

        $ vault write auth/github/config organization=brtlby

8. Go to [vault-ui](localhost:8080).
        
    * login using root token
    * create an admin policy
        ```
        {
          "path": {
            "*": {
              "capabilities": [
                "create",
                "read",
                "update",
                "delete",
                "list",
                "sudo"
              ]
            }
          }
        }
    * assign that policy to your orginization group
    * logout and login via github with a github token
    * revoke your root token
    * repeat step 5 with your new token (click burger in top right to access option to show token)