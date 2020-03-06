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
    
    @State var proposTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 17, contentR: "J'étais dans la rue et on m'a montré du doigt en criant : '...'", anonymousR: false, tagsR: [])
    
    @State var reponseTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
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
                PublicationFooter()
                }.font(.system(size: 18)).padding()
            }.font(.system(size: 20)).padding()
    }
}

struct AnswerView_Previews: PreviewProvider {
    var reponseTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
    
    static var previews: some View {
        AnswerView(reponseTest: Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "J'étais dans la rue et on m'a montré du doigt en criant : 'Bendo na bendo'", anonymousR: false, tagsR: []),comment: "")
    }
}
