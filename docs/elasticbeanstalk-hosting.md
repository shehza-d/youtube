# Server Hosting

https://aws.amazon.com/elasticbeanstalk/pricing

1. ```bash
   sudo eb init
   ```

1. ```bash
   sudo eb create
   ```

1. ```bash
   sudo eb deploy
   ```

1. to add env var `sudo eb setenv KEY1=value1 KEY2=value2` it will be added in beanstalk console dashboard (not in file)

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-httpredirect.html

## https://repost.aws/knowledge-center/elastic-beanstalk-https-configuration

eb init
initializes your local directory for use with Elastic Beanstalk. It sets default values and configuration for applications created with EB CLI.

eb init
doesn't create any environments in your AWS Elastic Beanstalk account.

eb create
is used to create a new Elastic Beanstalk environment and deploy your application version to it.

Some key points:

Run
eb init
first to initialize your local project directory for Elastic Beanstalk.

eb init
prompts you to set configuration like environment name, platform etc. These values only apply locally.

To actually create an environment in your AWS account, use
eb create
after initializing with
eb init
.

eb create
deploys your code/application version to the new environment that gets created in Elastic Beanstalk.

You can optionally specify configuration options like database details, version to deploy etc during
eb create
.

---

The difference between
eb create
and
eb deploy
is:

eb create
is used to create a new Elastic Beanstalk environment and deploy your application version to it for the first time. It provisions the necessary AWS resources like EC2 instances, load balancer etc.

eb deploy
deploys the application source bundle from the initialized project directory to an existing, running Elastic Beanstalk environment. It updates the running environment with a new application version without creating a new environment.

Some key points:

eb create
is used for initial environment creation and first deployment, while
eb deploy
updates an existing environment.

eb deploy
builds a source bundle from the local code using
git archive
if git is installed. Otherwise it zips all files excluding those in
.ebignore
.

You can optionally specify the version to deploy using
--version
for both commands.

eb deploy
displays CodeBuild logs if CodeBuild integration is enabled for building/deploying code.
