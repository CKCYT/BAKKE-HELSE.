import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@WebServlet("/sendSMS")
public class SMSServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public static final String ACCOUNT_SID = "your_account_sid";
    public static final String AUTH_TOKEN = "your_auth_token";
    public static final String TWILIO_PHONE_NUMBER = "your_twilio_phone_number";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String phone = request.getParameter("phone");
        String messageContent = request.getParameter("message");

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        try {
            Message message = Message.creator(
                    new com.twilio.type.PhoneNumber(phone),
                    new com.twilio.type.PhoneNumber(TWILIO_PHONE_NUMBER),
                    messageContent
            ).create();

            response.getWriter().write("SMS sent successfully! SID: " + message.getSid());
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().write("Failed to send SMS. Error: " + e.getMessage());
        }
    }
}
