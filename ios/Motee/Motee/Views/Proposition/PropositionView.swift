//
//  PropositionView.swift
//  Motee
//
//  Created by Rayan Bahroun on 06/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct PropositionView : View {
    
     @State var text = "Ceci est un propos test \" \" "
     @State var showAnswers = false
     @State var colorIfClicked = "white"
    @State var colorIfClicked2 = "black"
    //utiliser un objet Proposition
    func toggleColor(){
        if showAnswers{
            colorIfClicked = "black"
            colorIfClicked2 = "white"
        }else{
            colorIfClicked = "white"
            colorIfClicked2 = "black"

        }
    }
    
    var body: some View {
        //NavigationView{
            VStack{
            VStack{
                HStack{
                    Text("Pseudo").bold().foregroundColor(generateColor(name: self.colorIfClicked2))
                    Spacer()
                    Text(getDate()).bold().foregroundColor(generateColor(name: self.colorIfClicked2))
                }.padding()
                    .padding(.horizontal).background(generateColor(name: self.colorIfClicked))
            Spacer()
                Text(text)
                    .padding(.horizontal)
            Spacer()
                PublicationFooter().padding()
                Button(
                    action : {
                        self.showAnswers.toggle()
                        self.toggleColor()
                    }){
                       Text("Voir la meilleure réponse")
                }
                Spacer()
                
                }.frame(maxWidth: 380, maxHeight : 220 , alignment: .leading).edgesIgnoringSafeArea(.all)
            .background(lightGreyColor)
            .cornerRadius(20).shadow(radius: 20)
            .padding()
            if (showAnswers){
                AnswerView() //TODO : On montre la meilleure réponse
                /*NavigationLink(destination: {ListAnswersView()}() ){
                    ButtonGenerator(myText: "Toutes les réponses", myColor: "blue")
                }.padding()*/
            }
        }
        //}
    }
}


func getDate() -> String {
    return "28 juin 2020"
}

func getLike() -> String {
    return "100"
}
struct PropositionView_Previews: PreviewProvider {
    static var previews: some View {
        PropositionView()
    }
}
