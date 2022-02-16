# Add Orbit Activity Action

An action that creates an Orbit activity from a series of Workflow inputs. Perfect for creating on-the-fly integrations using Actions (specifically in the GitHub ecosystem).


## Inputs
| input property | description | 
| --------------|-------------|
| workspace | the workspace id | 
| api_key | your orbit API key (make it a secret |
| activity_type | Type of activity to add | 
| username | Username of user to add activity to |
| title | Title of activity |
| description | Description of activity  |
| occurred_at | Date and time of activity |


## Example workflow

```javascript 
name: addDiscussions

# Controls when the workflow will run
on:
  discussion:
    types: [created]

jobs:
  send:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be execute as part of the job
    steps:
    - name: Send Activity
        id: sending
        uses: brob/action-add-activity@v1.5.11
        with:
          workspace: ${{ secrets.ORBIT_WORKSPACE }}
          api_key: ${{ secrets.ORBIT_KEY }}
          username: ${{ github.event.discussion.user.login }}
          activity_type: 'discussion:created'
          title: 'Discussion created'
          occured_at: ${{ github.event.discussion.created_at }}
          description: |
            # ${{github.event.discussion.title }} 
            ${{ github.event.discussion.body }}
```