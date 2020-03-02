//
//  Accueil.swift
//  Motee
//
//  Created by Rayan Bahroun on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Accueil: View {
    var body: some View {
    
        NavigationView {
            Text("homePage")
            .navigationBarItems(leading:
                HStack {
                    Button(action: {}) {
                        Image(systemName: "minus.square.fill")
                            .font(.largeTitle)
                    }.foregroundColor(.pink)
                }, trailing:
                HStack {
                    Button(action: {}) {
                        Image(systemName: "plus.square.fill")
                            .font(.largeTitle)
                    }.foregroundColor(.blue)
            })
            
        }
    }
}

struct Accueil_Previews: PreviewProvider {
    static var previews: some View {
        Accueil()
    }
}
