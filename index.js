const core = require('@actions/core');
const github = require('@actions/github');

const OrbitActivities = require('@orbit-love/activities')



try {
    const workspace = core.getInput('workspace');
    const apiKey = core.getInput('api_key');
    const orbitActivities = new OrbitActivities(workspace, apiKey)
    const activity_type = core.getInput('activity_type')
    const username = core.getInput('username')
    const title = core.getInput('title')
    const occured_at = core.getInput('occured_at')
    const description = core.getMultilineInput('description')

    const activity = {
        activity_type: activity_type,
        title: title,
        occured_at: occured_at,
        description: description.join('\n'),
        member: {
            github: username,
        }
    }
    console.log(activity);


    orbitActivities.createActivity(activity).then(data => {
        core.setOutput("activity", JSON.stringify(data, null, 2))
    }).catch(error => {
        console.error(error)
        core.setFailed(error)
    })
    
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    core.setOutput("payload", payload);

  } catch (error) {
    core.setFailed(error.message);
  }