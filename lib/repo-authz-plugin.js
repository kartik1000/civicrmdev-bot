/**
 * Register an authorization function which determines if service is
 * authorized for a particular repository.
 */
module.exports = async (robot, configFile) => {
  robot.checkRepoAuthz = async function checkRepoAuthz (owner, repo) {
    return true;
  }
}
