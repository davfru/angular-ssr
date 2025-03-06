deploy/dev:
	@echo "Building Angular app..."
	cd angular && npm i && npm run build

	@echo "Deploying CDK stack..."
	cd cdk && npm i && npm run build && \
	cdk bootstrap && \
	cdk deploy SSRAppStack --parameters mySiteBucketName=dev-bucket-angularssr-1234

destroy/dev:

	@echo "Destroying CDK stack..."
	cd cdk && cdk destroy SSRAppStack
