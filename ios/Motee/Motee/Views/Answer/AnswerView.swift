//
//  AffichageAnswer.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import SwiftUI
import UserNotifications

struct AnswerView: View {
    
    @ObservedObject var utilisateurTest : User = User(pseudo: "root", password: "root", email: "root", city: "ville")
    
    @ObservedObject var proposTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 17, contentR: "J'étais dans la rue et on m'a montré du doigt en criant : '...'", anonymousR: false, tagsR: [])
    
    @ObservedObject var reponseTest : Answer
    
    @State var isNotHide : Bool = false
    @State var comment : String
        
    var body: some View {
        VStack(alignment: HorizontalAlignment.leading, spacing : 5){
            if reponseTest.anonymous {
                Text("Anonyme").foregroundColor(.blue).bold()
            } else {
                Text(reponseTest.owner.pseudo).foregroundColor(.blue).bold()
            }
            Text(reponseTest.contentPub).foregroundColor(.black)
            HStack(){
                Button(action:{
                    if self.reponseTest.estLikee(utilisateur: self.utilisateurTest){
                        self.reponseTest.disliker(userDislike: self.utilisateurTest)
                    }else{
                        self.reponseTest.liker(userLike: self.utilisateurTest)
                    }
                }){
                    HStack{
                        if self.reponseTest.estLikee(utilisateur: utilisateurTest){
                            Image(systemName: "heart.fill").foregroundColor(Color.red)
                        } else {
                            Image(systemName: "heart").foregroundColor(Color.black)
                        }
                        Text(String(reponseTest.nbLikes))
                    }
                }
                Spacer()
                Button(action:{
                    if self.isNotHide{
                        self.isNotHide = false
                    }else{
                        self.isNotHide = true
                    }
                }){
                    HStack{
                        Text("Commenter")
                        Image(systemName: "message.fill")
                    }
                    .padding(7)
                    .foregroundColor(.white)
                    .background(Color.blue).cornerRadius(40)
                }
                Spacer()
                Button(action:{
                    //signaler
                    self.sendNotification()
                }){
                    Image(systemName: "exclamationmark.triangle.fill").padding(7)
                    .foregroundColor(.white)
                    .background(Color.red).cornerRadius(40)
                }
                }.font(.system(size: 18)).padding()
            if isNotHide {
                HStack{
                    TextField("Commentaire...", text: $comment).cornerRadius(40)
                    Button(action:{
                        //Envoyer le commentaire
                    }){
                        Image(systemName: "arrowtriangle.right.circle.fill").padding(5)
                    }
                }.padding()
            }
            }.font(.system(size: 20)).padding()
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
    
}

struct AnswerView_Previews: PreviewProvider {
    var reponseTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
    
    static var previews: some View {
        AnswerView(reponseTest: Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "J'étais dans la rue et on m'a montré du doigt en criant : 'Bendo na bendo'", anonymousR: false, tagsR: []),comment: "")
    }
}
