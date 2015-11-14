# rdf-shell

[![Join the chat at https://gitter.im/melvincarvalho/rdf-shell](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/melvincarvalho/rdf-shell?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
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
    rdf obj <uri> [value]            - watches the first found object
    rdf patch <uri> <data>           - patch turtle data to a file
    rdf post <uri> <data>            - posts turtle data to a file
    rdf put <uri> <data>             - puts turtle data to a file
    rdf rm <uri>                     - removes a uri
    rdf sub <uri>                    - subscribes to a uri
    rdf tail <uri>                   - watches a URI for changes
    rdf touch <uri>                  - touches a uri
```

# Advanced

When working with access control lists and client side certificates, it is possible to add a cert using the environment variable

    CERT=<certificate_path>
