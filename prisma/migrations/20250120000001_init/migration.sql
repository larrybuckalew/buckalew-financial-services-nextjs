-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP WITH TIME ZONE
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "token" VARCHAR(255) UNIQUE NOT NULL,
    "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) UNIQUE NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "role_id" UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    "assigned_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR(100) UNIQUE NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    "permission_id" UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");
CREATE INDEX "sessions_token_idx" ON "sessions"("token");
CREATE INDEX "user_roles_user_id_idx" ON "user_roles"("user_id");
CREATE INDEX "user_roles_role_id_idx" ON "user_roles"("role_id");
CREATE INDEX "role_permissions_role_id_idx" ON "role_permissions"("role_id");
CREATE INDEX "role_permissions_permission_id_idx" ON "role_permissions"("permission_id");

-- Insert default roles
INSERT INTO roles (name, description) VALUES
    ('admin', 'Administrator with full system access'),
    ('manager', 'Manager with elevated privileges'),
    ('user', 'Standard user account');

-- Insert default permissions
INSERT INTO permissions (name, description) VALUES
    ('read:users', 'Can read user information'),
    ('write:users', 'Can create and update users'),
    ('delete:users', 'Can delete users'),
    ('manage:users', 'Can manage all user operations'),
    ('read:reports', 'Can read financial reports'),
    ('write:reports', 'Can create and update reports'),
    ('manage:reports', 'Can manage all report operations'),
    ('manage:system', 'Can manage system settings');

-- Assign permissions to roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin';

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'manager'
AND p.name IN ('read:users', 'write:users', 'read:reports', 'write:reports');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'user'
AND p.name IN ('read:reports');