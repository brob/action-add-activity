const core = require('@actions/core');
const github = require('@actions/github');

const OrbitActivities = require('@orbit-love/activities')



try {
    
    const workspace = core.getInput('workspace');
    const apiKey = core.getInput('api_key');
    const orbitActivities = new OrbitActivities(workspace, apiKey)
    const data = {
        activity_type: `discussion:${github.context.payload.action}`,
        title: github.context.payload.discussion.title,
        description: github.context.payload.discussion.body,
        member: {
            github: github.context.payload.discussion.user.login,
        }
    }
    console.log(data)
    orbitActivities.createActivity(data).then(data => {
        console.log('success', data)
    }).catch(error => {
        console.error(error)
    })
    
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    core.setOutput("payload", payload);

  } catch (error) {
    core.setFailed(error.message);
  }