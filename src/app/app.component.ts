import { Component,OnInit } from '@angular/core';
const logMock = [`
  Alauda DevOps Pipeline aa-liuzongyao/aa-q5xv6\r\nRunning in Durability level: MAX_SURVIVABILITY\r\n[Pipeline] Start of Pipeline\r\n[Pipeline] node\r\nStill waiting to schedule task\r\nWaiting for next available executor\r\nAgent base-q5sz1 is provisioned from template Kubernetes Pod Template\r\n---\r\napiVersion: \"v1\"\r\nkind: \"Pod\"\r\nmetadata:\r\n  labels:\r\n    jenkins: \"slave\"\r\n    jenkins/base: \"true\"\r\n    jenkins/tools: \"true\"\r\n  name: \"base-q5sz1\"\r\nspec:\r\n`,
  `jenkins: \"slave\"\r\n  `,
  `- name: \"JENKINS_AGENT_WORKDIR\"\r\n      value: \"/home/jenkins/agent\"\r\n    - name: \"JENKINS_URL\"\r\n      value: \"http://jenkins.default:8080\"\r\n    image: \"index.alauda.cn/alaudaorg/jnlp-slave:v2.9-13-g50000fe.161\"\r\n    imagePullPolicy: \"IfNotPresent\"\r\n    name: \"jnlp\"\r\n    resources:\r\n      limits: {}\r\n      requests:\r\n        memory: \"256Mi\"\r\n        cpu: \"200m\"\r\n    securityContext:\r\n      privileged: false\r\n    tty: false\r\n    volumeMounts:\r\n    - mountPath: \"/var/run/docker.sock\"\r\n      name: \"volume-0\"\r\n      readOnly: false\r\n    - mountPath: \"/tmp\"\r\n      name: \"volume-1\"\r\n      readOnly: false\r\n    - mountPath: \"/home/jenkins/agent\"\r\n  `,
        // "\033[31m 红色字 \033[0m",
   `  name: \"workspace-volume\"\r\n      readOnly: false\r\n    workingDir: \"/home/jenkins/agent\"\r\n  - args:\r\n    - \"cat\"\r\n    command:\r\n    - \"/bin/sh\"\r\n    - \"-c\"\r\n    env:\r\n    - name: \"JENKINS_URL\"\r\n      value: \"http://jenkins.default:8080\"\r\n    image: \"index.alauda.cn/alaudaorg/builder-tools:ubuntu-v2.9-5-gce5cb8f\"\r\n    imagePullPolicy: \"IfNotPresent\"\r\n    name: \"tools\"\r\n    resources:\r\n      limits: {}\r\n      requests:\r\n        memory: \"512Mi\"\r\n        cpu: \"200m\"\r\n 
  `,
  ` - mountPath: \"/var/run/docker.sock\"\r\n `,
  ` cpu: \"200m\"\r\n`,
  `readOnly: false\r\n`,
  ` - mountPath: \"/home/jenkins/agent\"\r\n      name: \"workspace-volume\"\r\n      readOnly: false\r\n    workingDir: \"/home/jenkins/agent\"\r\n  hostNetwork: false\r\n  nodeSelector:\r\n    beta.kubernetes.io/os: \"linux\"\r\n  restartPolicy: \"Never\"\r\n  securityContext: {}\r\n  serviceAccount: \"jenkins\"\r\n  volumes:\r\n  - hostPath:\r\n `,'\x1b[1;31m' + 'User:'+ '\x1b[37m' + 'my name']

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  logs = []
  times = 0
  scroll = false;
  fps = 60

  ngOnInit(){
    const id = setInterval(()=>{
      this.times  += 1
      if(this.scroll){
        this.logs.push(logMock[Math.floor((Math.random() * logMock.length)) ]);
        this.logs = this.logs.slice()
      } 
    }, 1000)

    // var rAF = (function() {
    //   return (
    //     window.requestAnimationFrame ||
    //     window.webkitRequestAnimationFrame ||
    //     function(callback) {
    //       window.setTimeout(callback, 1000 / 60);
    //     }
    //   );
    // })();

    // var frame = 0;
    // var allFrameCount = 0;
    // var lastTime = Date.now();
    // var lastFameTime = Date.now();

    // var loop = function() {
    //   var now = Date.now();
    //   var fs = now - lastFameTime;
    //   var fps = Math.round(1000 / fs);

    //   lastFameTime = now;
    //   // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    //   allFrameCount++;
    //   frame++;

    //   if (now > 1000 + lastTime) {
    //     var fps = Math.round((frame * 1000) / (now - lastTime));
    //     document.getElementById('fps').innerText = fps + ''
    //     frame = 0;
    //     lastTime = now;
    //   }

    //   rAF(loop);
    // };

    // loop();
  }

  clear(){
    this.logs = []
  }

  addLogs(num){
    let i = 0;
    let cache = ''
    while(i < num){i+=1;(cache += logMock[Math.floor((Math.random() * logMock.length)) ]) };
    this.logs.push(cache)
    this.logs = this.logs.slice()
  }

  get nums(){
    return this.logs.join().length
  }
}
