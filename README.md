# Test-task
<p>Frontend application available at: ubuntu@ec2-18-204-222-194.compute-1.amazonaws.com:8080</p>
<p>API application available at: ubuntu@ec2-18-204-222-194.compute-1.amazonaws.com:3000</p>

## API
<p>GET /transactions</p>
<p>GET /transactions/id</p>
<p>POST /transactions</p>
<p>DELETE /transactions/id</p>

### Run
From prject root:
```bash
./scripts/start.sh
```

### Development
```bash
npm run dev
```
or
```bash
npm run build:dev && npm run start:dev
```

### Test
To test api run
```bash
npm run test:back
```
