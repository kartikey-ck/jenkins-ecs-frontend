pipeline {
    agent { label 'ec2-fleet' }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "frontend-app:${env.BUILD_NUMBER}"
                    sh "docker build -t ${imageName} ."
                    env.FRONTEND_IMAGE = imageName
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --rm --name frontend-test -p 30000:3000 ${env.FRONTEND_IMAGE} || echo 'Container may already be running'"
                }
            }
        }
    }
}
