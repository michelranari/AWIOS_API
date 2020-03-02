//
//  AjoutView.swift
//  Motee
//
//  Created by Amjad Menouer on 27/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//
import Combine
import SwiftUI

struct AjoutView: View {
    //@ObservedObject var propos : Propos
    @State var newContent : String
    @State var alertEmptyAnswer : Bool = false
    @State var newAnswer : Reponse
    
    var utilisateurTest : Utilisateur = Utilisateur(pseudo: "root", password: "root", email: "root", city: "ville")
    var proposTest : Propos = Propos(userP: Utilisateur(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierP: 17, contentP: "Charlie delta commando", anonymousP: false, tagsP: [], titleP: "Titre Test")
    
    var body: some View {
        VStack(alignment:HorizontalAlignment.center,spacing: 15){
            if proposTest.anonymous {
                Text("Répondre à Anonyme").font(.system(size: 18)).bold().foregroundColor(.blue)
            } else {
                Text("Répondre à \(proposTest.owner.pseudo)").font(.system(size: 18)).bold().foregroundColor(.blue)
            }
            Text(proposTest.contentPub).font(.system(size: 18))
            Divider()
            TextField("Ecrivez votre réponse", text: $newContent)
            Divider()
            Button(action: {
                //Ajoute la réponse
                //Renvoie à l'écran d'accueil
                if self.newContent==""{
                    self.alertEmptyAnswer = true
                } else{
                    //
                    self.alertEmptyAnswer = false
                    self.newAnswer = Reponse.init(userR: self.utilisateurTest, identifierR: self.proposTest.answers.count+1, contentR: self.newContent, anonymousR: false, tagsR: self.proposTest.tags)
                    if self.proposTest.addReponse(newAnswer: self.newAnswer){
                        //Renvoie la liste de reponses ensuite
                    }
                }
            }){
                Text("Envoyer Réponse").bold().padding(10).foregroundColor(Color.white).background(Color.green).cornerRadius(40)
            }
            Button(action: {
                //Ajoute la réponse
                //Renvoie à l'écran d'accueil
                if self.newContent==""{
                    self.alertEmptyAnswer = true
                } else{
                    //
                    self.alertEmptyAnswer = false
                    self.newAnswer = Reponse.init(userR: self.utilisateurTest, identifierR: self.proposTest.answers.count+1, contentR: self.newContent, anonymousR: true, tagsR: self.proposTest.tags)
                    if self.proposTest.addReponse(newAnswer: self.newAnswer){
                        //Renvoie la liste de reponses ensuite
                    }
                }
            }){
                Text("Envoyer Réponse Anonyme").bold().padding(10).foregroundColor(Color.white).background(Color.gray).cornerRadius(40)
            }
            if alertEmptyAnswer {
                Text("Message vide...").foregroundColor(Color.red).padding(5)
            }
        }.padding()
    }
}

struct AjoutView_Previews: PreviewProvider {
    //ajouter un propos test...
    
    static var previews: some View {
        AjoutView(newContent: "",newAnswer: Reponse(userR: Utilisateur(pseudo: "", password: "", email: "", city: ""), identifierR: 0, contentR: "", anonymousR: true, tagsR: []))
    }
}
