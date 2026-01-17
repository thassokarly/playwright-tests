pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            args '--network teste_skynet'
        }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                // npm ci é mais seguro para CI do que o install
                sh 'npm ci' 
            }
        }

        stage('Testes') {
            steps {
                // Adicionamos o CI=true para garantir que o Playwright saiba que está num ambiente de CI
                sh 'CI=true npx playwright test'
            }
        }
    }

    post {
        always {
            // Isso garante que, mesmo que o teste falhe, o relatório seja salvo
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
            
            // Se você tiver o plugin do JUnit ou HTML Publisher, pode usar aqui:
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