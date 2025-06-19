import React from "react";
import { Card, CardContent } from "../components/CardProps";

import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import workflow from "../Image/gafrana.drawio.svg";
const ServerMonitoringGrafana: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">
       Monitor Server with Grafana, Prometheus & Node Exporter
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
          <h2 className="text-2xl font-semibold">Step 2: Install Grafana</h2>
          <p>
            <strong>Amazon Linux 2:</strong>
          </p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo tee /etc/yum.repos.d/grafana.repo <<EOF
[grafana]
name=grafana
baseurl=https://packages.grafana.com/oss/rpm
repo_gpgcheck=1
enabled=1
gpgcheck=1
gpgkey=https://packages.grafana.com/gpg.key
EOF

sudo yum install -y grafana`}
          </pre>
          <p>
            <strong>Ubuntu:</strong>
          </p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo apt-get install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y grafana`}
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 3: Start and Enable Grafana
          </h2>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo systemctl daemon-reexec
sudo systemctl enable grafana-server
sudo systemctl start grafana-server`}
          </pre>
          <p>
            Access Grafana at: <code>http://&lt;your-ec2-ip&gt;:3000</code>
          </p>
          <p>
            Default login: <code>admin / admin</code> (you’ll be prompted to
            change it)
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 4: Install Node Exporter
          </h2>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`cd /opt
sudo wget https://github.com/prometheus/node_exporter/releases/download/v1.8.1/node_exporter-1.8.1.linux-amd64.tar.gz
sudo tar xvf node_exporter-*.tar.gz
sudo mv node_exporter-*/node_exporter /usr/local/bin/`}
          </pre>

          <p>Create systemd service:</p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo tee /etc/systemd/system/node_exporter.service <<EOF
[Unit]
Description=Node Exporter
After=network.target

[Service]
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=default.target
EOF`}
          </pre>

          <p>Start service:</p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl start node_exporter`}
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step 5: Add Prometheus as Data Source
          </h2>
          <ol className="list-decimal ml-6">
            <li>
              Login to Grafana → Settings → Data Sources → Add data source
            </li>
            <li>
              Select <strong>Prometheus</strong>
            </li>
            <li>
              Set URL to <code>http://localhost:9090</code>
            </li>
          </ol>

          <p>
            <strong>Install Prometheus:</strong>
          </p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo useradd --no-create-home --shell /bin/false prometheus
sudo mkdir -p /etc/prometheus /var/lib/prometheus

sudo wget https://github.com/prometheus/prometheus/releases/download/v2.52.0/prometheus-2.52.0.linux-amd64.tar.gz
tar xvf prometheus-*.tar.gz
cd prometheus-*
sudo mv prometheus promtool /usr/local/bin/
sudo mv consoles console_libraries /etc/prometheus/
sudo mv prometheus.yml /etc/prometheus/`}
          </pre>

          <p>
            Edit configuration <code>/etc/prometheus/prometheus.yml</code>:
          </p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']`}
          </pre>

          <p>Start Prometheus:</p>
          <pre className="bg-black text-white p-4 rounded text-sm">
            {`sudo tee /etc/systemd/system/prometheus.service <<EOF
[Unit]
Description=Prometheus
After=network.target

[Service]
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/var/lib/prometheus \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable prometheus
sudo systemctl start prometheus`}
          </pre>
        </CardContent>
      </Card>

      <Card className="mb-6 overflow-x-auto">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">Step 6: Import Dashboard</h2>
          <ol className="list-decimal ml-6">
            <li>Go to Dashboards → New → Import</li>
            <li>
              Use Dashboard ID: <code>1860</code>
            </li>
            <li>Select Prometheus data source and click Import</li>
          </ol>
        </CardContent>
      </Card>

      <img src={workflow} alt="" />
      <div className="text-center mt-10">
        <Link to="/">
          <Button variant="secondary">← Back to Articles</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServerMonitoringGrafana;
