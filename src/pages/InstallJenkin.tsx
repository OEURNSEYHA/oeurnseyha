import React from "react";
import { Card, CardContent } from "../components/CardProps";

import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const InstallJenkin: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">
        How to Install jenkin on server and add modern plugin
      </h1>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 1: Launch and Connect to EC2
          </h2>
          <ol className="list-decimal ml-6">
            <li>
              Go to <strong>AWS EC2 Console</strong> and launch a new{" "}
              <code>t2.micro</code> or higher instance.
            </li>
            <li>
              Select <strong>Amazon Linux 2</strong> or{" "}
              <strong>Ubuntu 22.04</strong>.
            </li>
            <li>
              Open ports <code>22</code> (SSH) and <code>3000</code> (Grafana).
            </li>
            <li>
              SSH into the instance:
              <pre className="bg-black text-white p-4 rounded text-sm">
                {`ssh -i your-key.pem ec2-user@your-ec2-ip   # Amazon Linux
ssh -i your-key.pem ubuntu@your-ec2-ip     # Ubuntu`}
              </pre>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 2: Install Java (Required for Jenkin)
          </h2>

          <p>
            <strong>Ubuntu:</strong>
          </p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo apt install -y openjdk-17-jdk`}
          </pre>
          <h2 className="text-2xl font-semibold">Verify</h2>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`java -version`}
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 3: Add Jenkins Repository and install jenkin
          </h2>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo apt-key add 
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update -y
sudo apt install -y jenkins`}
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 4: Start and Enable Jenkins
          </h2>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo systemctl enable jenkins
sudo systemctl start jenkins`}
          </pre>
          <h2 className="text-2xl font-semibold">Check the Status:</h2>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo systemctl status jenkins`}
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 5: Open Port 8080 in Security Group
          </h2>
          <p></p>
          <ol className="list-decimal ml-6">
            <li>Find your EC2 instance’s security group.</li>
            <li>Edit inbound rules.</li>
            <li>
              Add a rule
              <ul>
                <li>Type: Custom TCP</li>
                <li>Port: 8080 </li>
                <li>ource: Your IP or 0.0.0.0/0 (if testing)</li>
              </ul>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 6: Unlock Jenkins</h2>
          <p>1. Open a browser and go to:</p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`http://your-ec2-public-ip:8080`}
          </pre>
          <p>2. Get the initial admin password:</p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo cat /var/lib/jenkins/secrets/initialAdminPassword`}
          </pre>
          <p>3. Copy and paste it into the Jenkins setup page.</p>
          <p>
            4. Follow the setup wizard,install suggested plugins, and create an
            admin user.
          </p>
           <p>
            5. Modern plugin: Blue Ocean, Pipeline Stage View, Pipeline Graph View, Pipeline Steps, GitHub Branch Source / GitLab Plugin,Docker Pipeline,Kubernetes Plugin
          </p>
          <p>
            6. Create Web Hook or Allow jenkin get code for private Repository 
            - Go to <b> https://github.com/settings/tokens </b> and create new classic token
            - And than Go to <b> https://github.com/Username/repo/settings/hooks</b> create new web hook and past <b>ip:8080/webhooks</b>
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-10">
        <Link to="/">
          <Button variant="secondary">← Back to Articles</Button>
        </Link>
      </div>
    </div>
  );
};

export default InstallJenkin;
