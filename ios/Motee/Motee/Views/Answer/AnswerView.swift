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
    
    @State var textA = "Ceci est une reponse test \" \" "
        
    var body: some View {
        VStack{
            VStack{
                HStack{
                    Text("Pseudo").bold()
                    Spacer()
                    Text(getDate()).bold()
                }.padding()
                    .padding(.horizontal)
            Spacer()
                Text(textA)
                    .padding(.horizontal)
            Spacer()
                AnswerFooter()
                
                Spacer()
                
                }.frame(maxWidth: 380, maxHeight : 150 , alignment: .leading).edgesIgnoringSafeArea(.all)
                .background(Color.white)
            .cornerRadius(20).shadow(radius: 20)
            .padding()
        }
    }
}

struct AnswerView_Previews: PreviewProvider {
    
    static var previews: some View {
        AnswerView()
    }
}
