package ch.puzzle.wasm.hello;

// import org.teavm.interop.Import;
import org.teavm.interop.Export;

import java.util.ArrayList;
import java.util.List;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.provider.ContactsContract;

public class Contact {
    private String name;
    private String phoneNumber;
    private String emailAddress;
  

    public Contact(String name, String phoneNumber, String emailAddress) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
   
    }
    public String getName() {
        return name;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
     public String getEmailAddress() {
        return emailAddress;
    }
    
    
    // private static List<Contact> fetchContacts(Context context) {
    private static String fetchContacts(Context context) {
        List<Contact> contacts = new ArrayList<>();
        ContentResolver contentResolver = context.getContentResolver();
        Cursor cursor = contentResolver.query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null);
        if (cursor != null && cursor.getCount() > 0) {
            return "Contacts retrieved successfully";
            // System.out.println("Contacts retrieved successfully");
            // Log.d(TAG, "Contacts retrieved successfully");
            // while (cursor.moveToNext()) {
            //     String id = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
            //     String name = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
            //     String phoneNumber = "";
            //     String emailAddress = "";

            //     Cursor phoneCursor = contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null,
            //             ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?", new String[] { id }, null);
            //     if (phoneCursor != null && phoneCursor.moveToFirst()) {
            //         phoneNumber = phoneCursor.getString(phoneCursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
            //         phoneCursor.close();
            //     }

            //     Cursor emailCursor = contentResolver.query(ContactsContract.CommonDataKinds.Email.CONTENT_URI, null,
            //             ContactsContract.CommonDataKinds.Email.CONTACT_ID + " = ?", new String[] { id }, null);
            //     if (emailCursor != null && emailCursor.moveToFirst()) {
            //         emailAddress = emailCursor.getString(emailCursor.getColumnIndex(ContactsContract.CommonDataKinds.Email.DATA));
            //         emailCursor.close();
            //     }

            //     contacts.add(new Contact(name, phoneNumber, emailAddress));
            // }
            cursor.close();
        } else {
            // Handle error
            System.err.println("Failed to retrieve contacts");
            Log.e(TAG, "Failed to retrieve contacts");
            return "Failed to retrieve contacts";
        }
        return "end";
    }

    // public static List<Contact> getContacts(Context context) {
    //     List<Contact> contacts = new ArrayList<>();
    //     Cursor cursor = context.getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null,
    //             null, null, null);
    //     if (cursor != null && cursor.moveToFirst()) {
    //         do {
    //             String name = cursor
    //                     .getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
    //             String phoneNumber = cursor
    //                     .getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
    //             String emailAddress = "";

    //             Cursor emailCursor = context.getContentResolver().query(
    //                     ContactsContract.CommonDataKinds.Email.CONTENT_URI, null,
    //                     ContactsContract.CommonDataKinds.Email.CONTACT_ID + " = ?",
    //                     new String[] { cursor
    //                             .getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.CONTACT_ID)) },
    //                     null);

    //             if (emailCursor != null && emailCursor.moveToFirst()) {
    //                 emailAddress = emailCursor
    //                         .getString(emailCursor.getColumnIndex(ContactsContract.CommonDataKinds.Email.DATA));
    //                 emailCursor.close();
    //             }

    //             Contact contact = new Contact(name, phoneNumber, emailAddress);
    //             contacts.add(contact);

    //         } while (cursor.moveToNext());
    //         cursor.close();
    //     }

    //     return contacts;
    // }

    // @Import(module = "env", name = "printMessage")
    // private static native void printMessage(String message);

    // @Export(name = "getContacts")
    // public static List<Contact> getContacts() {
    //     List<Contact> contacts = new ArrayList<>();
    //     contacts.add(new Contact("John Doe", "123-456-7890", "johndoe@email.com"));
    //     contacts.add(new Contact("Jane Doe", "987-654-3210", "janedoe@email.com"));
    //     return contacts;
    // }

    // @Export(name = "displayContacts")
    // public static String displayContacts() {
    //     List<Contact> contacts = getContacts();
    //     StringBuilder builder = new StringBuilder();
    //     for (Contact contact : contacts) {
    //         builder.append(contact.getName()).append("\n")
    //                 .append(contact.getPhoneNumber()).append("\n");
    //     }

    @Export(name = "getContacts")
    // public static List<Contact> getContacts(Context context) {
        public static String getContacts(Context context) {
        return fetchContacts(context);
    }

    // @Export(name = "displayContacts")
    // public static String displayContacts(Context context) {
    //     List<Contact> contacts = fetchContacts(context);
    //     StringBuilder builder = new StringBuilder();
    //     for (Contact contact : contacts) {
    //         builder.append(contact.getName()).append("\n")
    //                 .append(contact.getPhoneNumber()).append("\n")
    //                 .append(contact.getEmailAddress()).append("\n\n");
    //     }
    //     return builder.toString();
    // }
}
