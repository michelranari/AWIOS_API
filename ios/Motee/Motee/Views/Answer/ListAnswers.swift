//
//  ListeAnswers.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import SwiftUI

struct ListAnswersView: View {
    var proposTest : Proposition = Proposition(userP: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierP: 17, contentP: "Charlie delta commando", anonymousP: false, tagsP: [], titleP: "Titre Test")
    
    @ObservedObject var reponseTest1 : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
    @ObservedObject var reponseTest2 : Answer = Answer(userR: User(pseudo: "Koba", password: "root", email: "root", city: "ville"), identifierR: 19, contentR: "Ahannnnnn", anonymousR: true, tagsR: [])
    
    var answers : [Answer] = [
        Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: false, tagsR: []),
        Answer(userR: User(pseudo: "Koba", password: "root", email: "root", city: "ville"), identifierR: 19, contentR: "Ahannnnnn", anonymousR: false, tagsR: [])
    ]
            
    var body: some View {
        List{
            //Probleme avec bouton de likes / commentaire / signalement
            AnswerView(reponseTest : answers[0], comment: "")
            AnswerView(reponseTest : answers[1], comment: "")
        }
    }
}

struct ListAnswersView_Previews: PreviewProvider {
    static var previews: some View {
        ListAnswersView()
    }
}
