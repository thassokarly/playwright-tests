pipeline {
    agent {
        docker {
            image 'teste-jenkins:latest'
            args '--network teste_skynet'
        }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Testes') {
            steps {
                sh 'CI=true npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true

            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
