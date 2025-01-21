-- CreateTable
CREATE TABLE "security_events" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "type" VARCHAR(50) NOT NULL,
    "user_id" UUID REFERENCES users(id) ON DELETE SET NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "user_agent" TEXT,
    "status" VARCHAR(20) NOT NULL,
    "details" JSONB,
    "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "security_alerts" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "type" VARCHAR(50) NOT NULL,
    "severity" VARCHAR(20) NOT NULL,
    "source" VARCHAR(255) NOT NULL,
    "details" JSONB,
    "status" VARCHAR(20) NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP WITH TIME ZONE,
    "resolved_by" UUID REFERENCES users(id) ON DELETE SET NULL,
    "resolution_notes" TEXT
);

-- CreateIndex
CREATE INDEX "security_events_type_timestamp_idx" ON "security_events"("type", "timestamp");
CREATE INDEX "security_events_user_id_idx" ON "security_events"("user_id");
CREATE INDEX "security_events_ip_address_timestamp_idx" ON "security_events"("ip_address", "timestamp");
CREATE INDEX "security_events_status_timestamp_idx" ON "security_events"("status", "timestamp");

-- CreateIndex
CREATE INDEX "security_alerts_type_status_idx" ON "security_alerts"("type", "status");
CREATE INDEX "security_alerts_severity_status_idx" ON "security_alerts"("severity", "status");
CREATE INDEX "security_alerts_created_at_idx" ON "security_alerts"("created_at");