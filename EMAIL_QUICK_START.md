# 📧 IONOS Email - Quick Reference Card

## ✅ Your Email is Configured!

**Email**: larry@buckalewfinancialservices.com  
**Password**: NeverAgain911$  
**SMTP Server**: smtp.ionos.com  
**Port**: 587 (TLS)

---

## 🚀 Quick Commands

### Test Email (Run This First!)
```bash
npm run test:email
```

### Start Development Server
```bash
npm run dev
```

### View Database
```bash
npm run db:studio
```

---

## 🎯 What to Test

### 1. Email Test ✅
```bash
npm run test:email
```
✅ Check your inbox for test email

### 2. Quote Form ✅
- Go to: http://localhost:3000/quote
- Submit a test quote
- Check for 2 emails:
  - Customer confirmation
  - Admin notification (to you)

### 3. Contact Form ✅
- Go to: http://localhost:3000/contact
- Submit a message
- Check your email for notification

### 4. Admin Dashboard ✅
- Go to: http://localhost:3000/admin
- Login: admin@buckalew-financial.com / Admin123!
- View submitted quotes

---

## 📋 Emails Your Site Sends

| Type | To | When |
|------|----|----|
| Quote Confirmation | Customer | Quote submitted |
| Admin Alert | You | New quote received |
| Contact Message | You | Contact form sent |
| Password Reset | User | Reset requested |

---

## ⚠️ Troubleshooting

**Email not working?**
1. Run `npm run test:email`
2. Check spam folder
3. Verify password in `.env.local`
4. Check IONOS account status

**Can't login to admin?**
- Email: admin@buckalew-financial.com
- Password: Admin123!

---

## 📞 Quick Links

- **Admin Dashboard**: http://localhost:3000/admin
- **Quote Form**: http://localhost:3000/quote
- **Contact Page**: http://localhost:3000/contact
- **Database Studio**: Run `npm run db:studio`

---

## 🎉 You're Ready!

✅ Email configured  
✅ Quote system working  
✅ Admin dashboard ready  
✅ All pages complete  

**Next**: Test the quote form and check your email! 📧
