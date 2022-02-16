const core = require('@actions/core');
const github = require('@actions/github');

const OrbitActivities = require('@orbit-love/activities')



try {
    const workspace = core.getInput('workspace');
    const apiKey = core.getInput('api_key');
    const orbitActivities = new OrbitActivities(workspace, apiKey)
    let data;
    if (github.context.payload.comment) {
        data = {
            activity_type: `discussion:comment`,
            link: github.context.payload.comment.html_url,
            link_text: 'View the discussion',
            title: `Discussion comment`,
            occured_at: github.context.payload.comment.created_at,
            description: `
${github.context.payload.comment.body}`,
            member: {
                github: github.context.payload.comment.user.login,
            }
        }
    } else {
        data = {
            activity_type: `discussion:${github.context.payload.action}`,
            link: github.context.payload.discussion.html_url,
            link_text: 'View the discussion',
            title: `Discussion ${github.context.payload.action}`,
            occured_at: github.context.payload.discussion.created_at,
            description: `
# ${github.context.payload.discussion.title}
${github.context.payload.discussion.body}`,
            member: {
                github: github.context.payload.discussion.user.login,
            }
        }
    }
    
    

    orbitActivities.createActivity(data).then(data => {
        core.setOutput("activity", data)
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