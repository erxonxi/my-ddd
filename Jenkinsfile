void setCompletBuildStatus(String context, String message, String state) {
  step([
      $class: 'GitHubCommitStatusSetter',
      reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/erxonxi/fasteats'],
      contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: context],
      errorHandlers: [[$class: 'ChangingBuildStatusErrorHandler', result: 'UNSTABLE']],
      statusResultSource: [ $class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: message, state: state]] ]
  ])
}

pipeline {
  agent any
  stages {
    stage('Preparing...') {
      steps {
        setCompletBuildStatus('ci/my-ddd/deps', 'Installing Dependencies...', 'PENDING')
        setCompletBuildStatus('ci/my-ddd/tests:features', 'Testing Features...', 'PENDING')
        sh 'docker ps'
        sh 'docker-compose up -d mongo rabbitmq elasticsearch'
      }
    }

    stage('Install Deps') {
      steps {
        script {
          try {
            sh 'npm install'
            setCompletBuildStatus('ci/my-ddd/deps', 'Installed Deps. Correctly', 'SUCCESS')
          } catch (Exception e) {
            setCompletBuildStatus('ci/my-ddd/deps', 'Error Installing Dependencies', 'FAILURE')
          }
        }
      }
    }
  }
}
