
module.exports = (robot) => {
    robot.on('pull_request.closed', async context => {
        const pull_request = context.payload.pull_request;
            console.log('check')
            const { Gitlab } = require('@gitbeaker/node');
            const api = new Gitlab({
                host: 'https://lab.civicrm.org',
                token: 'C51SPBFvuEeBsJssyQf5',
            });
            api.MergeRequests.all(1).then((issue) => {
                console.log(issue)
                var pull_request_number = '#' + pull_request.number.toString()
                for(details in issue){
                    var issue_details = issue[details]
                    var title = issue_details.title
                    var equal = 1
                    console.log(title)
                    if(title.length<pull_request_number.length){
                        continue
                    }
                    else{
                        for(i=0;i<pull_request_number.length;i++){
                            if(pull_request_number[i] != title[i]){
                                equal = 0;
                                break;
                            }
                        }
                        var message_merged = 'The pull request which needed this documenatation has been merged. Thus, this documenation is also ready for merge. For more details refer here ' + pull_request.url
                        var message_closed = 'The pull request which needed this documenatation has been closed without merging. For more details refer here ' + pull_request.url
                        if(equal){
                            if(pull_request.merged){
                                api.MergeRequestDiscussions.create(1,issue_details.iid,message_merged).then((comment)=>{
                                    console.log(comment)
                                }).catch(error => {
                                    console.log(error)
                                })
                            }
                            else{
                                api.MergeRequestDiscussions.create(1,issue_details.iid,message_closed).then((comment)=>{
                                    console.log(comment)
                                }).catch(error => {
                                    console.log(error)
                                })
                            }
                        }
                    }
                    
                }
            }).catch( error => {
                console.log(error)
            })
    });
}