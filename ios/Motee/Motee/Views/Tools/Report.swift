//
//  Report.swift
//  Motee
//
//  Created by Rayan Bahroun on 06/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Report: View {
    
    var body: some View {
        Button(action:{
            //signaler
            sendNotification()
        }){
            Image(systemName: "exclamationmark.triangle.fill").padding(7)
                .foregroundColor(.white)
                .background(Color.red).cornerRadius(40)
        }
    }
}

func sendNotification(){
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert,.sound,.badge]) { (_, _) in
    }
    let content = UNMutableNotificationContent()
    content.title = "Signal Test"
    content.body = "..Raison du signalement.."
    
    let open = UNNotificationAction(identifier: "open", title: "Open", options: .foreground)
    let cancel = UNNotificationAction(identifier: "cancel", title: "Cancel", options: .destructive)
    
    let categories = UNNotificationCategory(identifier: "action", actions: [open,cancel], intentIdentifiers: [])
    
    UNUserNotificationCenter.current().setNotificationCategories([categories])
    
    content.categoryIdentifier = "action"
    
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
    
    let request = UNNotificationRequest(identifier: "alert", content: content, trigger: trigger)
    UNUserNotificationCenter.current().add(request, withCompletionHandler: nil)
}

