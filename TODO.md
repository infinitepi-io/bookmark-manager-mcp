# Bookmark Manager MCP - TODO

## S3 Storage Implementation

### Architecture Decision

- **User-owned S3 buckets**: Each user provides their own S3 bucket
- **Zero user management**: No accounts, no shared infrastructure
- **Simple configuration**: Environment variables for S3 credentials
- **Single file storage**: Store bookmarks.json at bucket root

### Implementation Tasks

#### 1. S3 Integration

- [ ] Add AWS SDK dependency
- [ ] Create S3 service module
- [ ] Implement read/write operations for bookmarks.json
- [ ] Handle S3 error cases (bucket not found, permissions, etc.)

#### 2. Environment Configuration

- [ ] Add required environment variables:
  - `S3_BUCKET` - User's S3 bucket name
  - `AWS_ACCESS_KEY_ID` - AWS access key
  - `AWS_SECRET_ACCESS_KEY` - AWS secret key
  - `AWS_REGION` - AWS region (default: us-east-1)
  - `S3_KEY` - S3 object key (default: bookmarks.json)

#### 3. Fallback Strategy

- [ ] Local file storage as fallback if S3 not configured
- [ ] Migration helper from local to S3

#### 4. Docker Configuration

- [ ] Create Dockerfile
- [ ] Document environment variables
- [ ] Create docker-compose.yml example
- [ ] Add health check endpoint

#### 5. Documentation

- [ ] Update README with S3 setup instructions
- [ ] Create AWS IAM policy example
- [ ] Add troubleshooting guide
- [ ] Docker deployment guide

### User Benefits

- **Full control**: Own their data completely
- **Cost transparency**: Pay only for their S3 usage
- **Global access**: Same bookmarks from anywhere
- **Built-in backup**: S3 versioning for bookmark history
- **Zero infrastructure**: No shared services to maintain

### Technical Benefits

- **Infinite scalability**: Each user brings their own storage
- **Zero operational overhead**: No user management or data isolation
- **Cost-effective**: No infrastructure costs
- **Simple deployment**: Just Docker container + user's S3 bucket
