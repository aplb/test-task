# Test-task
<p>Frontend application available at: http://ec2-18-204-222-194.compute-1.amazonaws.com:8080</p>
<p>API application available at: http://ec2-18-204-222-194.compute-1.amazonaws.com:3000</p>

## API
<p>GET /transaction</p>
<p>GET /transaction/id</p>
<p>POST /transaction</p>
<p>DELETE /transaction/id</p>

### Run
From project root:
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
