pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        def imageName = "frontend-app:${env.BUILD_NUMBER}"
                        sh "docker build -t ${imageName} ."
                        env.FRONTEND_IMAGE = imageName
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --rm --name frontend-test -p 8080:80 ${env.FRONTEND_IMAGE} || echo 'Container may already be running'"
                }
            }
        }
    }
    post {
        always {
            sh 'docker stop frontend-test || true'
        }
    }
}
