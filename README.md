# GitHub action for bumping versions in Maven
Bump the build version for a Maven project.


## Usage example
In order to use this workflow action, a reference to this repository action must be created. 
Todo this, create a file `.github/workflows/optional-filename.yml` located in your personal GitHub project.

Refer to the action with: `Frejdh/action-bump-version@master` or some specific release version like: `Frejdh/action-bump-version@v1.0.0`.
Configure the job according to the available [inputs located in action.yml](action.yml).

### Example
File: `.github/workflows/bump-version.yml`

```yaml
name: Bump versions

on:
  workflow_dispatch:
    inputs:
       version:
       description: Version to bump to
       required: true

       branch:
         description: Bump a specific branch. If blank, the default master/main branch will be used
         default: ''

jobs:
  bump-versions:
    runs-on: ubuntu-latest
    steps:
    - name: Bump versions
      uses: Frejdh/action-bump-version@master
      with:
        version: ${{ inputs.version }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
        branch: ${{ inputs.branch }}
```

Note, the input parameters `version` and `github-token` are required!

## Required permissions
In order for the action workflow to push the new changes, the permissions might have to be configured first.
In the repository settings, please look for the `Actions -> General` menu and set the settings accordingly:
![Image in resources directory](resources/repository-permissions.png?raw=true "Permissions")