# rdf-shell
rdf shell

# Installation

```
    sudo npm install -g rdf-shell
```

# Usage

```
    commands
    rdf cat <uri>                    - displays a uri
    rdf help                         - shows help message
    rdf ls <uri>                     - shows files in a container
    rdf patch <uri> <data>           - patch turtle data to a file
    rdf post <uri> <data>            - posts turtle data to a file
    rdf put <uri> <data>             - puts turtle data to a file
    rdf sub <uri>                    - subscribes to a uri
    rdf rm <uri>                     - removes a uri
    rdf touch <uri>                  - touches a uri
```

# Advanced

When working with access control lists and client side certificates, it is possible to add a cert using the environment variable

    CERT=<certificate_path>
