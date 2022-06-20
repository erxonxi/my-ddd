void setCompletBuildStatus(String context, String message, String state) {
  step([
      $class: 'GitHubCommitStatusSetter',
      reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/erxonxi/my-ddd'],
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
        setCompletBuildStatus('ci/deps', 'Installing Dependencies...', 'PENDING')
        setCompletBuildStatus('ci/tests:features', 'Testing Features...', 'PENDING')
      }
    }

    stage('Install Deps') {
      steps {
        script {
          try {
            sh 'npm install'
            setCompletBuildStatus('ci/deps', 'Installed Deps. Correctly', 'SUCCESS')
          } catch (Exception e) {
            setCompletBuildStatus('ci/deps', 'Error Installing Dependencies', 'FAILURE')
          }
        }
      }
    }

    stage('Tests') {
      parallel {
        // stage('Tests:Unit Backend') {
        //   steps {
        //     script {
        //       try {
        //         sh 'npm run test:unit'
        //         setCompletBuildStatus('ci/backend/tests:unit', 'Tests:Unit Backend Correctly', 'SUCCESS')
        //       } catch (Exception e) {
        //         setCompletBuildStatus('ci/backend/tests:unit', 'Error Installing Dependencies Backend', 'FAILURE')
        //       }
        //     }
        //   }
        // }

        stage('Tests:Features') {
          steps {
            script {
              try {
                sh 'npm run test:features'
                setCompletBuildStatus('ci/tests:features', 'Tests:Features Correctly', 'SUCCESS')
              } catch (Exception e) {
                setCompletBuildStatus('ci/tests:features', 'Error Tests Features', 'FAILURE')
              }
            }
          }
        }
      }
    }
  }
}
