// Email service for order notifications
import { createOrder } from './sqliteStorage.js'

// Email templates
function generateAdminEmail(orderData) {
    return {
        subject: `🎉 New Website Order #${orderData.id || 'NEW'}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #f59e0b;">🎉 New Website Order Received!</h2>
                
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">📋 Order Details</h3>
                    <p><strong>Client:</strong> ${orderData.clientName || 'Not specified'}</p>
                    <p><strong>Email:</strong> ${orderData.clientEmail || orderData.contact}</p>
                    <p><strong>Site Type:</strong> ${orderData.siteType}</p>
                    <p><strong>Pages:</strong> ${orderData.pages}</p>
                    <p><strong>Design:</strong> ${orderData.design}</p>
                    <p><strong>Total Price:</strong> $${orderData.discountedPrice || orderData.originalPrice}</p>
                    ${orderData.isPromoActive ? `<p><strong>🎁 Promo Applied:</strong> ${orderData.discount}% discount</p>` : ''}
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">📝 Project Description</h4>
                    <p style="white-space: pre-wrap;">${orderData.description || 'No description provided'}</p>
                </div>

                <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">⚙️ Selected Features</h4>
                    <ul>
                        ${orderData.features?.map(f => `<li>${f}</li>`).join('') || '<li>No features selected</li>'}
                    </ul>
                    
                    <h4>🔗 Integrations</h4>
                    <ul>
                        ${orderData.integrations?.map(i => `<li>${i}</li>`).join('') || '<li>No integrations selected</li>'}
                    </ul>
                </div>

                <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">💰 Pricing Summary</h4>
                    <p><strong>Original Price:</strong> $${orderData.originalPrice}</p>
                    ${orderData.isPromoActive ? `<p><strong>Discounted Price:</strong> $${orderData.discountedPrice}</p>` : ''}
                    ${orderData.monthlyPrice > 0 ? `<p><strong>Monthly:</strong> $${orderData.monthlyPrice}/mo</p>` : ''}
                </div>

                <p style="color: #6b7280; font-size: 14px;">
                    Order received at: ${new Date().toLocaleString()}
                </p>
            </div>
        `
    }
}

function generateClientEmail(orderData) {
    return {
        subject: `🎉 Your Website Order Confirmation`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #f59e0b;">🎉 Thank You for Your Order!</h2>
                
                <p>Dear ${orderData.clientName || 'Valued Client'},</p>
                
                <p>We're excited to confirm that we've received your website order and are ready to bring your vision to life!</p>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">📋 Your Order Summary</h3>
                    <p><strong>Site Type:</strong> ${orderData.siteType}</p>
                    <p><strong>Pages:</strong> ${orderData.pages}</p>
                    <p><strong>Design:</strong> ${orderData.design}</p>
                    <p><strong>Total Investment:</strong> $${orderData.discountedPrice || orderData.originalPrice}</p>
                    ${orderData.isPromoActive ? `<p><strong>🎁 Special Offer Applied:</strong> You saved $${orderData.originalPrice - orderData.discountedPrice}!</p>` : ''}
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">📝 Your Project</h4>
                    <p style="white-space: pre-wrap;">${orderData.description || 'No description provided'}</p>
                </div>

                <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">🚀 What's Next?</h4>
                    <ol>
                        <li><strong>Within 24-48 hours:</strong> We'll contact you to discuss your project in detail</li>
                        <li><strong>Planning phase:</strong> We'll create a detailed project plan and timeline</li>
                        <li><strong>Development:</strong> Your website will be built with care and attention to detail</li>
                        <li><strong>Launch:</strong> Your new website goes live!</li>
                    </ol>
                </div>

                <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">💬 Questions?</h4>
                    <p>If you have any questions or need to make changes to your order, please don't hesitate to reach out. We're here to help!</p>
                </div>

                <p>Thank you for choosing us for your website project. We can't wait to create something amazing together!</p>
                
                <p>Best regards,<br>
                Your Website Development Team</p>

                <p style="color: #6b7280; font-size: 14px;">
                    Order ID: ${orderData.id || 'NEW'}<br>
                    Date: ${new Date().toLocaleDateString()}
                </p>
            </div>
        `
    }
}

// Send emails via API
export async function sendOrderEmails(orderData) {
    try {
        console.log('📧 Starting email notifications...')
        console.log('📋 Order data:', {
            clientEmail: orderData.clientEmail,
            contact: orderData.contact,
            clientName: orderData.clientName
        })

        // Send to admin
        console.log('📤 Sending admin email to:', import.meta.env.VITE_ADMIN_EMAIL)
        const adminEmail = generateAdminEmail(orderData)
        const adminResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/email/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: import.meta.env.VITE_ADMIN_EMAIL,
                subject: adminEmail.subject,
                html: adminEmail.html
            })
        })
        
        if (adminResponse.ok) {
            console.log('✅ Admin email sent successfully')
        } else {
            console.error('❌ Admin email failed:', await adminResponse.text())
        }

        // Send to client
        const clientEmailAddress = orderData.clientEmail || orderData.contact
        console.log('📤 Sending client email to:', clientEmailAddress)
        
        if (!clientEmailAddress) {
            console.error('❌ No client email address found!')
            return false
        }

        const clientEmail = generateClientEmail(orderData)
        const clientResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/email/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: clientEmailAddress,
                subject: clientEmail.subject,
                html: clientEmail.html
            })
        })
        
        if (clientResponse.ok) {
            console.log('✅ Client email sent successfully')
        } else {
            console.error('❌ Client email failed:', await clientResponse.text())
        }

        console.log('✅ Email notifications completed')
        return true
    } catch (error) {
        console.error('❌ Failed to send email notifications:', error)
        return false
    }
} 